const Loader = () => {
  return (
    <>
      <style>{`
        .loader {
  --color-1: #8B5CF6;
      --size: 1px;


          width: calc(8 * var(--size));
          height: calc(40 * var(--size));
          border-radius: calc(4 * var(--size));
          display: block;
          position: relative;
          background: currentColor;
          color: var(--color-1);
          box-sizing: border-box;
          animation: animloader 0.3s 0.3s linear infinite alternate;
        }

        .loader::before,
        .loader::after {
          content: "";
          width: calc(8 * var(--size));
          height: calc(40 * var(--size));
          border-radius: calc(4 * var(--size));
          background: currentColor;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          box-sizing: border-box;
        }

        .loader::before {
          left: calc(-20 * var(--size));
          animation: animloader 0.3s linear infinite alternate;
        }

        .loader::after {
          left: calc(20 * var(--size));
          animation: animloader 0.3s 0.45s linear infinite alternate;
        }

        @keyframes animloader {
          0% {
            height: calc(48 * var(--size));
          }
          100% {
            height: calc(4 * var(--size));
          }
        }
      `}</style>

      <div className="flex h-screen items-center justify-center gap-4">
        <span className="loader"></span>
      </div>
    </>
  );
};

export default Loader;
