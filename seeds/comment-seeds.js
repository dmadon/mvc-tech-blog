const {Comment} = require('../models');

const commentData = [
    {
        comment_text:'Enjoyment is simply electrical impulses in the brain triggered by chemical stimuli',
        user_id: 5,
        post_id: 1,
    }, 
    {
        comment_text:'Aw, come on. All logic and no play make Spock a boring vulcan.',
        user_id: 4,
        post_id: 3,
    },
    {
        comment_text:"Those chemical stimuli sure do taste good, though, don't they?",
        user_id: 3,
        post_id: 1,
    }, 
    {
        comment_text:'I like a nice stout Klingon Raktajino first thing in the morning.',
        user_id: 1,
        post_id: 2,
    }, 
    {
        comment_text:'I prefer a Romulan Ale myself, but to each his own.',
        user_id: 4,
        post_id: 2,
    }
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;