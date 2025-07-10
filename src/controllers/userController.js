import userService from "../service/userService";

const userController = {
    handleUserPage: async (req, res) => {
        let usersList = await userService.getUsersList();
        return res.render("user.ejs", { usersList });
    },

    handleCreateNewUser: async (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;

        await userService.createNewUser(email, password, username);

        res.redirect("back");
    },

    handleDeleteUserById: async (req, res) => {
        const userId = req.params.userId
        await userService.deleteUserById(userId)
        res.redirect('back')
    },

    handleUpdateUserPage: async (req, res) => {
        const userId = req.params.userId
        const userInformation = await userService.getUserInformationById(userId)
        res.render('updateUser.ejs', { userInformation })
    },

    updateUserInformation: async (req, res) => {
        const { id, email, username } = req.body
        await userService.updateUserInformationById(id, email, username)
        res.redirect('/users')
    },
};

export default userController;
