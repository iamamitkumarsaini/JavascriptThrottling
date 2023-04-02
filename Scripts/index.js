let container = document.getElementById("container");
let page=1;
let limit=10;

async function getData (){
    
    try {
        let res = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`)
        let data = await res.json();
        console.log(data);

        data.forEach((elem,index) => {
            let div = document.createElement("div")
            div.setAttribute("id", "cards")
            let count = document.createElement("h3")
            count.innerText = elem.id;
            let comment = document.createElement("h4")
            comment.innerText = elem.body;

            div.append(count,comment)
            container.append(div);
        })
    }
    
    catch (err) {
        console.log(err)
    }
}

getData();


function throttle(anyFunc, limit){
    let flag=true;

    return function () {
        let context = this,
        args = arguments;
        if(flag){
            page++
            anyFunc.apply(context,args)
            flag=false;

            setTimeout(() => {
                flag=true;
            },limit)
        }
    }
}

let throttledGetData = throttle(getData, 800);

window.addEventListener('scroll', () => {
   const {scrollHeight, scrollTop, clientHeight} = document.documentElement;

   console.log(scrollHeight, scrollTop, clientHeight)
   if( scrollTop + clientHeight >= scrollHeight-2){
    throttledGetData()
   }
})