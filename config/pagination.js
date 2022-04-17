const nbEventPage=8;

function getNbPage(events){
    return Math.ceil(events.length/nbEventPage);
}

const getPages=(events)=>{
    let pages=[]
    for(let i=0;i<getNbPage(events);i++){
        pages.push(i)
    }
    return pages;
}
module.exports={nbEventPage, getPages, getNbPage}