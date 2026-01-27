// notes:
//  - width and height don't match itch.io, making games look smaller
//  - you can just embed from itch.io, but only the developer can get the embed link as far as i can tell
//  - would need to save embed link, width and height to db
//  - this method is reliant on itch.io staying up and not changing anything
//  - would want a play button so it doesn't autoload (especially for bigger more intense games)

export default function GamePage() {
  return (
    <div>
      <section className="flex w-full justify-center bg-muted px-12 py-10">
        <div className="h-[670px] w-[1000px]">
          <iframe
            src="https://itch.io/embed-upload/16152845?color=110e1a"
            width="1000"
            height="670"
            className="min-w-80 border-[26px] border-accent [clip-path:polygon(20px_20px,calc(100%-20px)_20px,100%_32px,100%_30%,calc(100%-20px)_45%,calc(100%-20px)_calc(100%-8px),80%_calc(100%-8px),75%_calc(100%-20px),20px_calc(100%-20px),0%_60%,0%_30%,20px_25%)]"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
