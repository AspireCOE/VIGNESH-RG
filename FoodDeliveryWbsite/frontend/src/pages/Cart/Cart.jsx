import './Cart.css';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import ClearIcon from '@mui/icons-material/Clear';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate=useNavigate()
  const {countNumber,count,removeFromCart,getTotalCartAmount,food_list,url}=useContext(StoreContext);
  return (
    <div className='cart-page'>
      <div className="items">
        <div className="cart-items-title">
          <p>ITEMS</p>
          <p>TITLE</p>
          <p>PRICE</p>
          <p>QUANTITY</p>
          <p>TOTAL</p>
          <p>REMOVE</p>
        </div>
        <br />
        <hr />
        {food_list.map((item)=>{
          if(count[item._id]>0){
            return(
              <div className="cart-items-title cart-items-item" key={item._id}>
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{count[item._id]}</p>
                <p>$ {item.price*count[item._id]}</p>
                <div onClick={()=>removeFromCart(item._id)} className="remove-cart"><ClearIcon/></div>
              </div>
            )
          }
        })}
        {!countNumber&& <div className='no-food-item'><h4>No Food Item Added To the Cart  </h4> <SentimentVeryDissatisfiedIcon/></div>}
        
      </div>
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <hr />
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>{getTotalCartAmount()}</p>
        </div>
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>free!</p>
        </div>
        <div className="cart-total-details">
          <p>Total</p>
          <p>{getTotalCartAmount()}</p>
        </div>
        <button onClick={()=>navigate('/order')} >Proceed To CheckOut</button>
      </div>
    </div>
  )
}

export default Cart;