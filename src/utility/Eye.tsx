import eyeOpen from "../assets/images/eyes-open.png";

export default function Eye() {
  return (
    <button className='hidden  bg-[rgb(99,95,199)] hover:bg-[rgb(120,116,220)] w-16  items-center justify-center p-4 rounded-r-4xl absolute bottom-20 cursor-pointer'>
      <img className='w-6 h-6' src={eyeOpen} alt='opened eyes icon ' />
    </button>
  );
}
