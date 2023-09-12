import { useEffect } from 'react';

function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && ref.current.classList.contains('active') && !ref.current.contains(event.target)) {
        ref.current.classList.remove('active')
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown",handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown",handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideAlerter