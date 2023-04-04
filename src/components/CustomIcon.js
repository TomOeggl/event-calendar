const CustomIcon = ({ selectedIcon }) => {
  const customIcons = Object.freeze({
    "soccer-ball": (
      <span className=" text-center inline-block">
        <img
          src={`./customIcons/${selectedIcon}-icon.png`}
          alt="Custom made soccer ball Icon"
          className="object-scale-down w-6 h-6"
        ></img>
      </span>
    ),
    "yellow-card": (
      <span className=" text-center inline-block">
        <img
          src={`./customIcons/${selectedIcon}-icon.png`}
          alt="Custom made yellow card Icon"
          className="object-scale-down w-6 h-6"
        ></img>
      </span>
    ),
    "yellow-red-card": (
      <span className=" text-center inline-block">
        <img
          src={`./customIcons/${selectedIcon}-icon.png`}
          alt="Custom made yellow red card Icon"
          className="object-scale-down w-6 h-6"
        ></img>
      </span>
    ),
    "red-card": (
      <span className=" text-center inline-block">
        <img
          src={`./customIcons/${selectedIcon}-icon.png`}
          alt="Custom made red card Icon"
          className="object-scale-down w-6 h-6"
        ></img>
      </span>
    ),
  });

  return customIcons[selectedIcon];
};

export default CustomIcon;
