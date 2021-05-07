import React, { Component } from "react";
import "./App.css";
import { Select, Input, Button, Table, Image, Switch } from "antd";

class App extends Component {
    state = {
        Filter: [],
        AlbumFilter: [],
        ShowResult: [],
        searchInput: [],
        hidecomponent: false
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((res) => res.json())
            .then(res => this.setState({ Filter: res, ShowResult: res }))
    }

    handleChang = (value) => {
        fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${value}`)
            .then((res) => res.json())
            .then(res => this.setState({ AlbumFilter: res, ShowResult: res }))
    }


    onSearch = v => {
        const { Filter } = this.state
        let keyword = v.target.value
        const result = Filter.filter(v => {
            return v.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        this.setState({
            ShowResult: result
        })
    }

    onAlbumSearch = v => {
        const { AlbumFilter } = this.state
        let keyword = v.target.value
        const result = AlbumFilter.filter(v => {
            return v.title.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
        this.setState({
            ShowResult: result
        })

    }

    onChange = value => {
        const { Filter } = this.state
        if (value) {
            this.setState({
                ShowResult: []
            })
        }
        else {
            this.setState({
                ShowResult: Filter
            })
        }
        this.setState({
            hidecomponent: value
        })
    }

    render() {
        const { Filter, ShowResult, hidecomponent } = this.state
        let array = []
        Filter.map(v => {
            array.push(v.albumId)
        })
        let Album = Array.from(new Set(array))
        const { Option } = Select;

        const columns = [

            {
                title: 'Filter',
                dataIndex: 'thumbnailUrl',
                render: thumbnailUrl => <Image src={thumbnailUrl} />,
            },
            {
                title: 'Title',
                dataIndex: 'title',
            },
            {
                title: 'Album',
                dataIndex: 'albumId',
            },
        ];


        return (
            <div className="App">
                <div className="SwitchSearch">
                    <Switch onChange={this.onChange} />
                    <text> Switch to -- </text>
                    <Button
                        type="primary"
                        size="small"
                    >
                        {hidecomponent ? 'Search' : 'Album Search'}
                    </Button>
                </div>
                <div className="AllSearch" >
                    {
                        hidecomponent == false &&
                        <Input.Group compact>
                            <Input
                                className="Search"
                                placeholder="input title"
                                onChange={this.onSearch}
                                style={{ width: 550 }}
                            />
                        </Input.Group>
                    }

                    {
                        hidecomponent == true &&
                        <Input.Group compact>
                            <Select
                                style={{ width: 150 }}
                                placeholder="Select Album"
                                onChange={this.handleChang}
                            >
                                {
                                    Album.map(item => (
                                        <Option value={item} > {item} </Option>
                                    ))
                                }
                            </Select>

                            <Input
                                style={{ width: 400 }}
                                placeholder="input title"
                                onChange={this.onAlbumSearch}
                            />
                        </Input.Group>
                    }

                </div>

                <div className="Result"
                >
                    <Table
                        dataSource={ShowResult}
                        columns={columns}
                        style={{ textAlignLast: "center" }}
                    />
                </div>
            </div >
        )

    }
}



export default App;