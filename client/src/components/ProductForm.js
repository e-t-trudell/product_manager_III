import { useEffect,useState} from 'react'
import axios from 'axios';

const ProductForm = (props)=>{
    const [message, setMessage]= useState('Loading...')
    const {product,setProduct}= props
    const [title, setTitle]= useState('')
    const [price, setPrice]= useState('')
    const [description, setDescription]= useState('')
    useEffect(()=>{
        axios.get('http://localhost:8000/api')
        .then(res=>setMessage(res.data.message))
        .catch(err=>console.log(err))
    },[])
    
    const onSubmitHandler = (e)=> {
        e.preventDefault()
        // DONT FORGET YOUR // in the url
        axios.post('http://localhost:8000/api/product',{title,price,description})
        .then(res =>{
            console.log(res);
            console.log(res.data);
            setProduct([...product,res.data])
        })
        .catch(err=>console.log({msg:'Posting Error',err:err}))
    }
    return (
        <>

        {/* This is a message from the backend
        <div>
            <h2>Message from the Conglomo: {message}</h2>
        </div> */}
        <div className="col-6 mx-auto">
            <form  onSubmit={onSubmitHandler}>
                <label className="form-label">Title</label>
                <input className="form-control" type="text" value={title} onChange = {(e)=>setTitle(e.target.value)}/>

                <label className="form-label">Price</label>
                <input type="text" className="form-control" value={price} onChange = {(e)=>setPrice(e.target.value)}/>

                <label className="form-label">Description</label>
                <input type="text" className="form-control" name="description" value={description} onChange = {(e)=>setDescription(e.target.value)}/>
                <button type="submit" className="btn btn-info mt-3">Create Product</button>
            </form>
        </div>
        {/* You can display here or just view in components using react tools ext 
        <div>
            <p>title State: {title}</p>
            <p>price State: {price}</p>
            <p>description State: {description}</p>
        </div>*/}
        </>
    )
}
export default ProductForm;