import { Review } from '@/types/product'
import Rating from '@/components/ui/rating'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { Component, useState } from 'react'
import { Button } from '@/components/ui/button'
import FeedbackForm from './feedback-form'

interface ProductReviewsProps {
  reviews: Review[],
  id: string
}

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null; info: React.ErrorInfo | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null, info: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ error, info })
  }

  render() {
    if (this.state.hasError) {
      return <div>Error occurred: {this.state.error?.message}</div>
    }

    return this.props.children
  }
}

export default function ProductReviews({ reviews, id }: ProductReviewsProps) {
  console.log(reviews) // To check the reviews prop
  console.log(id);
  
  return (
    <ErrorBoundary>
      <div className="mt-12 bg-green-50 p-6 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="space-y-6 bg-white/30">
          <FeedbackForm product={id}/>
          {reviews?.length > 0 ? (
            reviews.map((review) => {
              const { id, photoURL = '', name = 'Anonymous', date = '', rating = 0, comment = '' } = review

              return (
                <div key={id} className="shadow-md rounded-lg py-4 px-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={photoURL} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start justify-start">
                        <span className="font-semibold">{name}</span>
                        <div className="flex">
                          <Rating rating={rating} size={14} />
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{date}</span>
                  </div>
                  <p className="text-gray-800">{comment}</p>
                </div>
              )
            })
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  )
}
