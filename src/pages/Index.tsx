import FibonacciSunflower from "@/components/FibonacciSunflower";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-golden mb-4">
            Fibonacci Growth Spiral
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the mathematical beauty of nature's most efficient packing pattern,
            as seen in sunflower seeds, pine cones, and spiral galaxies.
          </p>
        </div>
        
        <FibonacciSunflower />
      </div>
    </div>
  );
};

export default Index;
