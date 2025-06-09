const Feed = require('../models/feedModel');

exports.getAllFeeds = async (req, res) => {
  try {
    const feeds = await Feed.getAll();
    res.json(feeds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch feeds' });
  }
};

exports.getFeedById = async (req, res) => {
  try {
    const feed = await Feed.getById(req.params.id);
    if (!feed) return res.status(404).json({ message: 'Feed not found' });
    res.json(feed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch feed' });
  }
};

exports.createFeed = async (req, res) => {
  try {
    const newFeed = await Feed.create(req.body);
    res.status(201).json(newFeed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create feed' });
  }
};

exports.updateFeed = async (req, res) => {
  try {
    const updatedFeed = await Feed.update(req.params.id, req.body);
    if (!updatedFeed) return res.status(404).json({ message: 'Feed not found' });
    res.json(updatedFeed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update feed' });
  }
};

exports.deleteFeed = async (req, res) => {
  try {
    const deletedFeed = await Feed.delete(req.params.id);
    if (!deletedFeed) return res.status(404).json({ message: 'Feed not found' });
    res.json({ message: 'Feed deleted', deletedFeed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete feed' });
  }
};
