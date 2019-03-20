export default class DataUploadUtil {
    /**
     * 上传图片数据
     * @param uri
     */
    static uploadImage(uri){
        let formData = new FormData();
        let file = {uri:uri,type:'multipart/form-data',name:'image.png'};
        formData.append('file',file);
        console.log(formData);
        fetch('url',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        }).then((response)=>{
            if (response.ok){
                return response.text();
            }
            throw new Error ('Network response was not ok.')
        }).then((responseData)=>{
            console.log('responseData',responseData);
            return true;
        }).catch((error)=>{
            console.log('error',error);
            return false;
        });
    }

    /**
     * 上传健康数据
     * @param data
     * @param uri
     * @returns {boolean}
     */
    static uploadHealthData(data,uri){
        return true;
    }
}