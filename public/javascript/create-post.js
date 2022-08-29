async function newPostButton(event){
    event.preventDefault();
    document.location.replace('/dashboard/new-post')};

    document.querySelector('#create-post-btn').addEventListener('click',newPostButton);