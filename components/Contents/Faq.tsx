"use client";

import { gitTechStack } from "@/atom/techStack";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { IoIosAddCircle } from "react-icons/io";
import { useRecoilState } from "recoil";
import Heading from "../Heading";
import InputField from "../InputField";

type Props = {};

function FaqSection({}: Props) {
  const [faqValues, setFaqValue] = useState({
    question: "",
    answers: "",
  });
  const [listOfFaq, setListOfFaq] = useState([]);
  const [gitHubTechStack, setGitHubTechStack] = useRecoilState(gitTechStack);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaqValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onAddValue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const question = faqValues.question;
    const answers = faqValues.answers;

    if (question || answers) {
      const element = { question, answers };
      setListOfFaq((ls) => [...ls, element] as any);
      setFaqValue((prev) => ({
        ...prev,
        question: "",
        answers: "",
      }));
    }
  };

  const updateState = (value: string[]) => {
    if (!value) return;

    setGitHubTechStack((prev) => ({
      ...prev,
      faqSection: value,
    }));
  };

  const removeElement = (value: string, label: string) => {
    if (value) {
      const removeCurrentState = listOfFaq.filter(
        (element: any) => element[label] !== value
      );

      setListOfFaq(removeCurrentState);

      const removeItem = gitHubTechStack.faqSection.filter(
        (element: any) => element[label] !== value
      );

      setGitHubTechStack((prev) => ({
        ...prev,
        faqSection: removeItem,
      }));
    }
  };

  useEffect(() => {
    updateState(listOfFaq);
  }, [listOfFaq]);
  return (
    <div className="py-8">
      <Heading label="FAQ" icon={BsQuestionCircle} />
      <div className="flex flex-col justify-between gap-4">
        <div className="py-4 flex justify-between gap-4">
          <InputField
            onChange={onChange}
            label="Question"
            type="text"
            name="question"
            value={faqValues.question}
          />
          <InputField
            onChange={onChange}
            label="Answer"
            type="text"
            name="answers"
            value={faqValues.answers}
          />
          <button
            onClick={(e: any) => onAddValue(e)}
            className="bg-[#265D97] hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded inline-flex items-center gap-1"
          >
            <span>Add</span>
            <IoIosAddCircle size={15} />
          </button>
        </div>
        <div className="inline-block md:flex justify-start gap-52">
          <div className="hidden md:flex flex-col justify-between gap-2 max-h-36">
            <div className="flex gap-2">
              <p className="text-lg font-medium">Example</p>
            </div>
            <div className="text-sm font-normal text-[#7c8691]">
              <p>Question 1</p>
              <p className="text-sm font-normal text-[#7c8691] py-2 px-4">
                Answer 1
              </p>
            </div>
            <div className="text-sm font-normal text-[#7c8691]">
              <p>Question 2</p>
              <p className="text-sm font-normal text-[#7c8691] py-2 px-4">
                Answer 2
              </p>
            </div>
          </div>
          {gitHubTechStack.faqSection.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="flex flex-col justify-between gap-2 h-full"
            >
              <div className="flex gap-2">
                <p className="text-lg font-medium">Your Details</p>
              </div>
              {gitHubTechStack.faqSection.map((data: any, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                  key={index}
                >
                  {data.question && (
                    <div className="flex flex-col gap-2 items-start">
                      <p
                        className="flex gap-2 items-center cursor-pointer text-center text-sm font-normal text-[#7c8691]"
                        onClick={() => removeElement(data.question, "question")}
                      >
                        {data.question}
                      </p>
                    </div>
                  )}
                  {data.answers && (
                    <p
                      className="text-center text-sm font-normal text-[#7c8691] py-2 px-4"
                      onClick={() => removeElement(data.answers, "answers")}
                    >
                      {data.answers}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FaqSection;