import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const naviGate = useNavigate();

    const currency = '$';
    const delieveryfee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');


    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Please Select The Size ')
            return;
        }


        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;

            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);

        if (token) {

            try {

                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})
                
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
            
        }


    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;


    }
    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = structuredClone(cartItem);

        cartData[itemId][size] = quantity;
        setCartItem(cartData)

        if (token) {
            

            try {
                 await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
            
        }

    }

    const CartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    /* get data from backend and display frontend */

    const getProductData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)


        }
    }
// whenever backend api call for cart data add get and so on page are refresh the cart data empty so this function are not empty cart data if once time the user add data in cart and this function also call below useefect function
    const getUserCart = async (token) => {
        try {

            const response  = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})

            if (response.data.success) {
                setCartItem(response.data.cartData)
                
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }

    }

    useEffect(() => {
        getProductData()
    }, [])
    // whenever user can refresh website the authrization false and display login and sign up functionaloty so i set the logic if one time user are login website do not log out automatically if the click log out button
    useEffect(()=> {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])
    useEffect(() => {
        const timer = setTimeout(() => {
            if(!localStorage.getItem('token')){
                const confirmLogin = window.confirm("You have not logged in! Would you like to log in?")
                if (confirmLogin){
                    naviGate('/login');
                }
            }
        }, 30000)
        return () => clearTimeout(timer)
      },[])

 





    const value = {
        products, currency, delieveryfee,
        search, setSearch, showSearch, setShowSearch,
        setCartItem, cartItem, addToCart,
        getCartCount,
        updateQuantity,
        CartAmount,
        naviGate, backendUrl,
        setToken, token

    }







    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider