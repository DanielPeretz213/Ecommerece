import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { cartItem, Product, user } from "../types/types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface ContextType {
  hendleAddUser: (user: user) => void;
  logOut: (id: string) => void;
  logIn: (userEmail: string, userPass: string) => void;
  users: user[];
  loggedInUser: user | null;
  addProductToUserCart: (newProduct: Product) => void;
  removeItem: (id:string) => void;
}

export const creatCont = createContext<ContextType | null>(null);

export const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<user[]>(()=>{
    const stored = localStorage.getItem("allUsers");
    return stored ? JSON.parse(stored) : [];
  });
  const [loggedInUser, setLoggedInUser] = useState<user | null>(null);

  const hendleAddUser = (newUser: user) => {
    const exists = users.find(
      (u) => u.email === newUser.email && u.password === newUser.password
    );

    if (exists) {
      toast.error("This account already exists, you need to login");
      navigate("/login");
      return;
    }

    setUsers((prev) => [...prev, newUser]);
    console.log(users);
    setLoggedInUser(newUser);
    toast.success(`Hello ${newUser.name}, you were added successfully`);
  };

  const logOut = (id: string) => {
    if (!loggedInUser) return;

    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === id ? { ...u, conected: false } : u))
    );
    setLoggedInUser(null);
    toast.success("log out succcessfuly");
  };

  const logIn = (email: string, pass: string) => {
    const findUser = users.find(
      (u) => u.email === email && u.password === pass
    );

    if (!findUser) {
      toast.error("User not found,enter correct details or register again");
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === findUser.id ? { ...u, conected: true } : u))
    );

    setLoggedInUser({ ...findUser, conected: true });
    navigate("/");
    toast.success(`Hi, You logged in successfully!`);
  };

  const addProductToUserCart = (newProduct: Product) => {
    if (!loggedInUser) {
      navigate("/login");
      toast.warning("You need to register to add product");
    } else {
      const newCartItem: cartItem = {
        id: String(newProduct.id),
        name: newProduct.title,
        price: String(newProduct.price),
        image: newProduct.image,
        quantity: 1,
      };

      setUsers((prev) =>
        prev.map((u) => {
          if (u.id !== loggedInUser.id) return u;
          const exsitingItem = u.cart.find(
            (i) => i.id === String(newProduct.id)
          );
          let updateCart;

          if (exsitingItem) {
            updateCart = u.cart.map((item) =>
              item.id === String(newProduct.id)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            updateCart = [...u.cart, newCartItem];
          }
          setLoggedInUser({ ...u, cart: updateCart });
          return { ...u, cart: updateCart };
        })
      );
      console.log(loggedInUser);
      toast.success(`${newCartItem.name} add successfuly!`);
    }
  };

  const removeItem = (id:string) => {
      setUsers((prev)=>
      prev.map((currentUser)=>{
        if(currentUser.id === loggedInUser?.id){
          let cart:cartItem[] = currentUser.cart.map((i)=>{
            if(i.id === id){
              if(i.quantity > 1){
                return {...i,quantity:i.quantity -1}
              }
              return
            }
            return i;
          }).filter((item): item is cartItem => item !== undefined);
          console.log({...currentUser,cart:cart})
          setLoggedInUser({...currentUser,cart:cart})
          return {...currentUser,cart:cart}
        }

        return currentUser
      })
      )
  }

  useEffect(()=>{
    localStorage.setItem("allUsers",JSON.stringify(users))
  },[users])

  return (
    <creatCont.Provider
      value={{
        hendleAddUser,
        logIn,
        logOut,
        users,
        loggedInUser,
        addProductToUserCart,
        removeItem,
      }}
    >
      {children}
    </creatCont.Provider>
  );
};

export const useContextInformation = () => {
  const context = useContext(creatCont);
  if (!context) {
    throw new Error(
      "useIncontextInformation must be used within a ContextInformation provider"
    );
  } else {
    return context;
  }
};
