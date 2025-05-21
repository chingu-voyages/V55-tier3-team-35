const StarryBackground = ({ count = 20 }) => {
  return (
    <>
      <div className="absolute inset-0 starry-bg opacity-30" />
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="star animate-twinkle absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.9 + 0.1,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </>
  );
};

export default StarryBackground;
