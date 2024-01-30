import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

const AboutUs = () => {
    return (
        <div>
            <Header></Header>
            <section className="py-16 bg-white-100 px-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-lg leading-relaxed mb-8">
            Welcome to Serenity Properties, where we redefine the experience of buying and selling properties.
            Our dedicated team is committed to providing exceptional service and guiding you through every step of the process.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            At Serenity Properties, we understand the importance of finding the perfect home or selling your property seamlessly.
            With years of experience in the real estate industry, we are here to make your journey smooth and stress-free.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Whether you are a first-time homebuyer, a seasoned investor, or looking to sell your property, we are here to assist you.
            Your satisfaction is our priority, and we take pride in building lasting relationships with our clients.
          </p>
        </div>
      </section>
      <Footer></Footer>
        </div>
      
    );
  };
  
  export default AboutUs;