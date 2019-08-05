export const isStrInJson = (sStr)=>{
    try{
        JSON.parse(sStr) ;
    }
    catch(sErr){
        return false;
    }
    return true;
}

export const getFormattedDateFromDateStr=(sDateStr)=>{
    const oDt=new Date(sDateStr);
    return (oDt.getMonth()+1)+"/"+oDt.getDate()+"/"+oDt.getFullYear();
}
export const getFormattedDateAndTimeFromDateStr=(sDateStr)=>{
    const oDt=new Date(sDateStr);
    return (oDt.getMonth()+1)+"/"+oDt.getDate()+"/"+oDt.getFullYear()+" "+oDt.getHours()+":"+oDt.getMinutes()+":"+oDt.getSeconds();
}