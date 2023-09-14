module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define("post", {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
          },
          contenido: {
            type: DataTypes.STRING,
            allowNull: false
          },
          imagen: {
            type: DataTypes.STRING,
            allowNull: false
          },
          link: {
            type: DataTypes.STRING,
            allowNull: false
          },
          dia: {
            type: DataTypes.STRING,
            allowNull: false
          }
    })

        return Post

}