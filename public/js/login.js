$("document").ready(()=>{
    const loginStatus = ()=>{
        if(localStorage.getItem("status") == "yes"){
            for(i=0;i<x.length;i++){x[i].style.display="none";}
            for(i=0;i<y.length;i++){y[i].style.display="visible";}            
        }
        else{
            for(i=0;i<y.length;i++){y[i].style.display="none";}
            for(i=0;i<x.length;i++){x[i].style.display="visible";}
        }
    }
    const x = document.getElementsByClassName("signed-out");
    const y = document.getElementsByClassName("signed-in");
    console.log(x);
    console.log(y);
    loginStatus();
    const config =  { headers: { 'Content-Type': 'multipart/form-data' } };
    $("#login").click(()=>{
        event.preventDefault();
        const email = $("#email-login").val();
        const password = $("#pwd-login").val();
        const body = new FormData();
        body.append( "email",email);
        body.append("password",password);
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)){
            axios.post("http://127.0.0.1:3000/user/login",body,config).then((response)=>{
                localStorage.setItem("status","yes")
                location.reload()

            })
            return true;
        }
        else{
            $("#signin-error-msg").text("Invalid email!");
        }
        
        
    })
    $("#logout").click(()=>{
        event.preventDefault()
        axios.post("http://127.0.0.1:3000/user/logout",config).then((response)=>{
            localStorage.removeItem("status")
            location.reload()
        })
        
        
    })
    
})