import { useEffect, useRef, useState } from "react";

const useDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const el = ref.current;

    const closeDropdown = (e: MouseEvent) => {
      if (el && !el.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);

    return () => {
      document.body.removeEventListener("click", closeDropdown);
    };
  }, []);

  return { ref, dropdownOpen, toggleDropdown };
};

export default useDropdown;
