import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
export const createMembership= (membershipName,membershipPrice,membershipDescription)=>async(dispatch)=>{
    try {
        dispatch({
            type:"createMembershipReuest"
        })
        await axios.post("https://search-engine-backend-k1bs.onrender.com/api/v1/create-memberships",{membership_name:membershipName,membership_price:membershipPrice,membership_description:membershipDescription})
        dispatch({
            type:"createMembershipSuccess"
        })
    } catch (error) {
        dispatch({
            type:"createMembershipFailure",
            payload:error.response.data.message
        })
    }
}

export const allMemberships =()=>async(dispatch)=>{
    try {
        dispatch({
            type:"GetAllMembershipsRequest"
        })
       const {data} = await axios.get("https://search-engine-backend-k1bs.onrender.com/api/v1/all-memberships")
       dispatch({
        type:"GetAllMembershipsSuccess",
        payload:data.all_memberships
       })
    } catch (error) {
        dispatch({
            type:"GetAllMembershipsFailure",
            payload:error.response.data.message
        })
    }
}

export const buyMembership = (membership)=>async (dispatch)=>{
    try {
        dispatch({
            type:"buyMembershipRequest"
        })
        
        const stripe = await loadStripe('pk_test_51K7jzHSEu1sDfKjEHqOo5sOaKQEqcwEiaYWwnc1oofaq5q0V45uWPvIS2DYLRf7YqeorI57Man6bxwUpUyyL7Sgh00bUwajwHw');
        
        const response = await axios.post("https://search-engine-backend-k1bs.onrender.com/api/v1/buy-membership",{membership_name:membership});
        
        
        if(response){
            const {sessionId} = response.data;
            console.log(sessionId)
            const stripeSession = await stripe.redirectToCheckout({
                sessionId:sessionId,
            })
            
            if (stripeSession.error) {
                console.error('Error redirecting to checkout:', stripeSession.error);
              }
              else{
                await axios.post("https://search-engine-backend-k1bs.onrender.com/api/v1/update-membership",{membership_name:membership});
                
                dispatch({
                    type:"buyMembershipSuccess"
                })
              }
        }
        else {
            console.error('Membership purchase failed:', response.message);
            dispatch({
                type:"buyMembershipFailure",
                
            })
          }
    } catch (error) {
        
        dispatch({
            type:"buyMembershipFailure",
            
        })
        
    }
}
