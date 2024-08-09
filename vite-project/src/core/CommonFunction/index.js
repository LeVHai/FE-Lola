import apiService from "../service/api"

const CommonFunction ={
    getMessenger : async function getMessenger(payload){
        const res = await apiService.getChat(payload)
        return res
    }
}
export default CommonFunction