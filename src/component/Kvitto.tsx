type KvittoProps = {
  sum: number;
};

const Kvitto = ({ sum }: KvittoProps) => (
  <section className="kvitto container-column">
    <h3>Frakt</h3>
    <h3>0 kr</h3>
    <h3>Total</h3>
    <h3>{sum}</h3>
  </section>
);

export default Kvitto;
