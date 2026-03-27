import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';

interface Review {
  id: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewsPage: React.FC = () => {
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      guestName: 'Alice Johnson',
      rating: 5,
      comment: 'Excellent service and beautiful rooms. Highly recommended!',
      date: '2025-03-25',
    },
    {
      id: '2',
      guestName: 'Bob Wilson',
      rating: 4,
      comment: 'Great location and friendly staff. Minor issues with WiFi.',
      date: '2025-03-24',
    },
    {
      id: '3',
      guestName: 'Carol Davis',
      rating: 5,
      comment: 'Perfect stay! Everything was perfect.',
      date: '2025-03-23',
    },
    {
      id: '4',
      guestName: 'David Lee',
      rating: 3,
      comment: 'Good value for money, but could improve cleanliness.',
      date: '2025-03-22',
    },
  ]);

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  const renderStars = (rating: number) => {
    return (
      <span className="text-yellow-400">
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </span>
    );
  };

  return (
    <Layout title="Reviews">
      <div className="space-y-6">
        <Card className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Average Rating</p>
              <p className="text-4xl font-bold text-yellow-400 mt-2">{averageRating}</p>
              <p className="text-slate-400 text-sm mt-2">Based on {reviews.length} reviews</p>
            </div>
            <div className="text-5xl text-yellow-400">★</div>
          </div>
        </Card>

        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-white font-semibold">{review.guestName}</p>
                  <p className="text-slate-400 text-sm">{review.date}</p>
                </div>
                <div>{renderStars(review.rating)}</div>
              </div>
              <p className="text-slate-200">{review.comment}</p>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ReviewsPage;
