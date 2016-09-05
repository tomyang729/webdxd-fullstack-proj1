var Student = React.createClass({

    render: function () {
        return <div>{this.props.student.firstname}</div>;
    }
});

var StudentList = React.createClass({

    getInitialState: function () {
        return {
            studentList: []
        }
    },

    componentDidMount: function () {

        var Reactthis = this;

        axios.get('http://localhost:3000/student/')
            .then(function (response) {
                Reactthis.setState({
                    studentList: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    handleClick() {
        //TODO
    },

    render: function () {
        return (
            <div>
                {
                    this.state.studentList.map(function(student) {
                        console.log(student);
                        return <Student onClick={this.handleClick} student={student} key={student._id}/>
                    })
                }

            </div>
        );
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById("app")
);