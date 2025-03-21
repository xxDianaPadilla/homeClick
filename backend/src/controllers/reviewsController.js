const reviewsController = {};

import reviewsModel from '../models/Reviews.js';

reviewsController.getReviews = async (req, res) =>{
    const reviews = await reviewsModel.find().populate('customerId').populate('propertyId');
    res.json(reviews);
};

reviewsController.createReviews = async (req, res) =>{
    const {comments, rating, customerId, propertyId} = req.body;
    
    const newReviews = new reviewsModel({
        comments, rating, customerId, propertyId
    });

    await newReviews.save();
    res.json({message: "Reviews saved!"});
};

reviewsController.deleteReviews = async (req, res) =>{
    const deleteReview = await reviewsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Reviews deleted!"});
};

reviewsController.updateReviews = async (req, res) =>{
    const {comments, rating, customerId, propertyId} = req.body;

    const updateReview = await reviewsModel.findByIdAndUpdate(req.params.id, {comments, rating, customerId, propertyId}, {new: true});

    res.json({message: "Reviews updated!"})
};

export default reviewsController;