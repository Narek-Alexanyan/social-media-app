import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  return (
    <WidgetWrapper>
      <div className="flex justify-between items-center">
        <h5 className="font-medium text-black dark:text-white">Sponsored</h5>
        <p className="text-base text-black dark:text-white">Create Ad</p>
      </div>
      <img
        src="http://localhost:3001/assets/info4.jpeg"
        alt="advert"
        className=" w-full h-auto rounded-xl my-3"
      />
      <div className="flex justify-between items-center">
        <p className="text-base text-black dark:text-white">MikaCosmetics</p>
        <p className="text-base text-black/70 dark:text-white">
          mikacosmetics.com
        </p>
      </div>
      <p className="text-base text-black/70 dark:text-white my-2">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </p>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
