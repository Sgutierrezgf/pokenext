import { Disclosure, Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import Modal from "./Modal";
import React from "react";
import Profile from "./Profile";
import Image from "next/image";
import { userImage } from "../constants";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Header = () => {
  const [isSelectedUserVisible, setIsSelectedUSerVisible] =
    React.useState<boolean>(false);

  const { data } = useSession();
  const [selectedUSer, setSelectedUser] = React.useState<any>();
  const handleSelectPokemon = (data: any) => {
    setSelectedUser(data);
    setIsSelectedUSerVisible(true);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                  id="Image"
                  className="block h-12 w-auto lg:hidden"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
                  alt={`${data?.user?.name}`}
                  width={100}
                  height={100}
                />
                <Image
                  className="hidden h-12 w-auto lg:block"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
                  alt={`${data?.user?.name}`}
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button
                    id="menu"
                    className="button flex rounded-full bg-white items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span id="menu" className="sr-only">
                      Open user menu
                    </span>
                    <span id="name" className="font-semibold text-gray-500">
                      {data?.user?.name}
                    </span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={data?.user?.image || userImage}
                      alt={`${data?.user?.name}`}
                      width={100}
                      height={100}
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    id="items"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          id="profile"
                          onClick={() => handleSelectPokemon(data)}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 w-full"
                          )}
                        >
                          Profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          id="signout"
                          onClick={() => signOut()}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700 w-full"
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isSelectedUserVisible}
          onClose={() => setIsSelectedUSerVisible(false)}
        >
          <Profile selectedUser={selectedUSer} />
        </Modal>
      </>
    </Disclosure>
  );
};
