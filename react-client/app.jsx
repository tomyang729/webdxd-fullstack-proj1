var Student = React.createClass({

    handleClick: function() {
        this.props.updateStu(this.props.student);
    },

    render: function () {
        return <h1 onClick={this.handleClick}>{this.props.student.firstname}</h1>;
    }
});

var StudentList = React.createClass({

    getInitialState: function () {
        return {
            studentList: [],
            showDetails: false,
            selectedStu: {}
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

    updateStudent: function(stu) {
        console.log('123');
        this.setState({showDetails: true, selectedStu: stu});
    },



    render: function () {
        var stu = this.state.selectedStu;
        var ReactThis = this;
        return (
            <div>
                <div>
                    {
                        this.state.studentList.map(function(student) {
                            return <Student updateStu={ReactThis.updateStudent} student={student} key={student._id}/>
                        })
                    }
                </div>
                <div>
                    <hr/>
                    <h3>Details: </h3>
                    <br/>
                </div>
                <div>
                    {
                        this.state.showDetails ? <Detail stu={stu}/> : null
                    }
                </div>

            </div>
        );
    }
});

var Detail = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Name:  {this.props.stu.firstname} {this.props.stu.lastname}</h2>
                <h2>Email: {this.props.stu.email}</h2>
                <h2>Age:   {this.props.stu.age}</h2>
            </div>
        );
    }
});

ReactDOM.render(
    <StudentList/>, document.getElementById("app")
);