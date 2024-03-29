import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
export const createMembership= (membershipName,membershipPrice,membershipDescription)=>async(dispatch)=>{
    try {
        dispatch({
            type:"createMembershipReuest"
        })
        await axios.post("/api/v1/create-memberships",{membership_name:membershipName,membership_price:membershipPrice,membership_description:membershipDescription})
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
       const {data} = await axios.get("/api/v1/all-memberships")
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

export const buyMembership = (membership) => async (dispatch) => {
    try {
        dispatch({
            type: "buyMembershipRequest",
        });

        const stripe = await loadStripe('pk_test_51K7jzHSEu1sDfKjEHqOo5sOaKQEqcwEiaYWwnc1oofaq5q0V45uWPvIS2DYLRf7YqeorI57Man6bxwUpUyyL7Sgh00bUwajwHw');

        const response = await axios.post("/api/v1/buy-membership", { membership_name: membership });

        if (response.status === 200) {
            const { sessionId } = response.data;

            const stripeSession = await stripe.redirectToCheckout({
                sessionId: sessionId,
            });

            if (stripeSession.error) {
                console.error('Error redirecting to checkout:', stripeSession.error);
                dispatch({
                    type: "buyMembershipFailure",
                });
            } else {
                await axios.post("/api/v1/update-membership", { membership_name: membership });
                
                console.log(2);
                dispatch({
                    type: "buyMembershipSuccess",
                });
            }
        } else {
            console.error('Membership purchase failed:', response.data.message);
            dispatch({
                type: "buyMembershipFailure",
            });
        }
    } catch (error) {
        console.error('Error in buyMembership:', error.message);
        dispatch({
            type: "buyMembershipFailure",
        });
    }
};
