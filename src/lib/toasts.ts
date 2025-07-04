import { toast } from "sonner";

export const successToast = (message:string)=>{
    toast(`✅ ${message}`);
}
export const errorToast = (message:string)=>{
    toast(`❌ ${message}`);
}
