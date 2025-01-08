const BillingSection = ({ hotelId, children }) => {
    return (
        <div>
            <section className='mb-8'>
                <h2 className='text-xl font-semibold mb-4'>Your trip</h2>
                {/* Dates */}
                {children}
            </section>
        </div>
    );
};

export default BillingSection;
