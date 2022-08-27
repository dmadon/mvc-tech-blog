const {Post} = require('../models');

const postData = [
    {
        title:'Ice Cream is Enjoyable',
        content:'My favorite ice cream flavor is cookies and cream. Although, I also enjoy peppermint, birthday cake, caramel, and dark chocolate.',
        user_id:1
    },
    {
        title:'The joy of tea',
        content:"I love Earl Grey tea. Ever since I was a child growing up on my family's vineyard in France, I have loved the soothing aroma and flavor of it.",
        user_id:2
    },
    {
        title:'Logic Above All',
        content:'I know that all conflict can be solved with logic rather than emotion.',
        user_id:5
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;