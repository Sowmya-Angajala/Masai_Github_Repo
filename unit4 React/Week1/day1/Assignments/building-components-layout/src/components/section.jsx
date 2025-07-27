import Card from "./Card";

function Section() {
  const cardsData = [
    { title: "Card 1", description: "This is card one" },
    { title: "Card 2", description: "This is card two" },
    { title: "Card 3", description: "This is card three" }
  ];

  return (
    <section className="section">
      {cardsData.map((card, index) => (
        <Card key={index} title={card.title} description={card.description} />
      ))}
    </section>
  );
}
export default Section;
