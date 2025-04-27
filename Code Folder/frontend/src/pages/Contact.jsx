const people = Array.from({ length: 4 }).map((_, i) => ({
    id: i,
    name: `Member ${i + 1}`,
    role: 'Full‑Stack Developer',
    img: `https://picsum.photos/seed/team${i}/300/300`,
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }));
  
  const Contact = () => (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">Meet the Team</h1>
  
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {people.map((p) => (
          <div key={p.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 text-center">
            <img
              src={p.img}
              alt={p.name}
              className="w-28 h-28 rounded-full mx-auto object-cover mb-4"
            />
            <h2 className="text-xl font-semibold dark:text-white">{p.name}</h2>
            <p className="text-blue-600 dark:text-blue-400 text-sm">{p.role}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{p.bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
  
  export default Contact;
  