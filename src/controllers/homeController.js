const homeController = {
    handleHelloWorld: (req, res) => {
        const name = "HVKhai";
        return res.render("home.ejs", { name });
    },
};

export default homeController;
