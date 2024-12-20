import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Review } from '@/types/product';
import { useIsAuthorized } from '@/hooks/useIsAuthorized';
import { useDispatch } from 'react-redux';
import { postReview } from '@/api/review/postReview';

function FeedbackForm({product} : {product: string}) {
  const {auth} = useIsAuthorized();
  const dispatch = useDispatch();
  const [feedback, setFeedback] = useState("");
  function handleFeedback(){
    console.log(product);
    
    if(auth.uid && auth.name && auth.photoURL){
        const payload = {
            id: auth.uid,
            name: auth.name,
            photoURL: auth.photoURL,
            rating: 5,
            comment: feedback,
            date: Date.now().toString()
        }
        postReview(product, payload, dispatch);
    }
    else{
        console.log("not authorised feedback")
    }
  }
  return (
    <div className='flex gap-3 justify-between items-center bg-green-50 py-2 px-6'>
        <input type="text" className='w-full border outline-none p-2 rounded-md' placeholder='feedback...' value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        <Button onClick={handleFeedback}>
          Give Feedback
        </Button>
    </div>
  )
}

export default FeedbackForm