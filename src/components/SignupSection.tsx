import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SignupSection = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="signup" className="py-24 bg-gray-900">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Let's Get You Set Up
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Fill in your details and we'll be in touch shortly to build your assistant.
          </p>
        </div>

        {!formSubmitted ? (
          <div className="mt-12">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </Label>
                <div className="mt-1">
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    className="block w-full rounded-md bg-gray-800 border-gray-700 text-white p-3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md bg-gray-800 border-gray-700 text-white p-3"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Phone Number
                </Label>
                <div className="mt-1">
                  <Input
                    type="tel"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    required
                    className="block w-full rounded-md bg-gray-800 border-gray-700 text-white p-3"
                  />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full px-6 py-4 text-lg bg-emerald-600 hover:bg-emerald-700"
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-12 p-8 bg-gray-800 rounded-lg shadow-xl text-center">
            <h3 className="text-3xl font-bold text-emerald-400">We got your message!</h3>
            <p className="mt-4 text-lg text-gray-300">
              Someone will be in touch shortly to set up your assistant.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SignupSection;
