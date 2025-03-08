import React from "react";
import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";

const ButtonPrimary = React.forwardRef(
  (
    { className, children, loading, type = "fullfil", onClick, ...props },
    ref
  ) => {
    return (
      <>
        <button
          className={`text-base rounded-md flex justify-center ${
            type === "fullfil"
              ? "text-white bg-primaryColor hover:bg-hoverPrimaryColor transition-all"
              : "bg-transparent border border-primaryColor text-primaryColor tooltip"
          } font-square-medium ${loading && "bg-opacity-50"} ${className}`}
          ref={ref}
          disabled={loading}
          onClick={onClick}
          {...props}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : children}
        </button>
      </>
    );
  }
);

ButtonPrimary.displayName = "ButtonPrimary";

ButtonPrimary.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  type: PropTypes.oneOf("fullfil", "outline"),
  onClick: PropTypes.func.isRequired,
};

export default ButtonPrimary;
