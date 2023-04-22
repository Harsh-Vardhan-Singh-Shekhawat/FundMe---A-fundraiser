import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import CustomButton from "../components/CustomButton";
import { useStateContext } from "../context";
import { checkIfImage } from "../utils";
import Loader from "../components/Loader";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {createCampaign} = useStateContext();
  const [form, setForm] = useState({
    createrName: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const formChangeHandler = (e) => {
    setForm((prevData) => ({
      ...prevData,
      [e.target.name]:e.target.value,
    }))
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    checkIfImage(form.image, async (exists) => {

      if(exists){
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)})
        setIsLoading(true)
        navigate("/");

      } else {
        alert("Image URL does not work!");
        setForm({...form, image:""});
      }
    })
    setForm({
      createrName: "",
      title: "",
      description: "",
      target: "",
      deadline: "",
      image: "",
    })
  };

  return (
    <div className="bg-[#f0eaea] flex justify-center items-center flex-col  rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start A Campaign
        </h1>
      </div>
      <form
        onSubmit={submitHandler}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-row  gap-[40px]">
          <input
            htmlFor="Your Name "
            placeholder="Amit Sharma"
            type="text"
            name="createrName"
            onChange={(name) => formChangeHandler(name)}
            className="py-[15px] sm:px-[25px]  w-1/2 px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue  text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]" 
          />
          <input
            htmlFor="Campaign Title"
            placeholder="Provide a Title "
            type="text"
            name="title"
            onChange={(name)=> {formChangeHandler(name)}}
            className="py-[15px] sm:px-[25px] w-1/2 px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue  text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]" 

          />
        </div>
        <textarea
            htmlFor="Story"
            placeholder="Write your story"
            type='textarea'
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-gray text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-h-[300px]"
            name="description"
            onChange={(name)=> {formChangeHandler(name)}}            
          />
          <div className="flex  gap-[40px]">
            <input
              htmlFor="Goal"
              placeholder="ETH 0.5"
              type="text"
              name="target"
              onChange={(name)=> {formChangeHandler( name)}}
              className="py-[15px] sm:px-[25px] px-[15px] w-1/2 outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue  text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]" 

            />
            <input
              htmlFor="End Date"
              placeholder="End Date"
              type="date"
              name="deadline"
              onChange={(name)=> {formChangeHandler( name)}}
              className="py-[15px] sm:px-[25px] px-[15px] w-1/2 outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue  text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            />
          </div>
          <input
              htmlFor="Image"
              placeholder="Campaign Image"
              type="url"
              name="image"
              onChange={(name)=> {formChangeHandler( name)}}
              className="py-[15px] sm:px-[25px] px-[15px] w-full outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue  text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            />
            <div className="flex justify-center items-center mt-[20px]">
              <CustomButton 
                buttonType="submit" 
                title="Create Campaign" 
                styles="bg-[#1dc071] h-[50px] "/>
            </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
