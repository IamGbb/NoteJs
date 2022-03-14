import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { Auth0Provider } from '@auth0/auth0-react'

//dev-lklv3wxk.us.auth0.com
//WMW4rKtwC9YaOLTULsrFPnSjmvaskWP2

ReactDOM.render(
<Auth0Provider
    domain="dev-lklv3wxk.us.auth0.com"
    clientId="WMW4rKtwC9YaOLTULsrFPnSjmvaskWP2"
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
>
<UserProvider>
<ProductsProvider>
<FilterProvider>
<CartProvider>
<App />
</CartProvider>
</FilterProvider>
</ProductsProvider>
</UserProvider>
</Auth0Provider>
, document.getElementById('root'))
