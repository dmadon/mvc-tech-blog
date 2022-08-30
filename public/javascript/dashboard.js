

async function dashboardDirector(event){

    const response = await fetch('/dashboard');

    if (response.ok){
        document.location.replace('/dashboard/')}
    else{document.location.replace('/login/')}    
};

document.querySelector("#dashboard").addEventListener("click", dashboardDirector);