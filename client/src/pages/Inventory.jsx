import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Form, message, Button } from "antd";
import callApi from "../services/callAPI";
import endPoints from "../services/endPoint";
import InventoryModal from "./InventoryModal";

function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [updateContent, setUpdateContent] = useState(null);
    const [modalType, setModalType] = useState('ADD');




    const { inventory: inventoryConfig } = endPoints
    const { Search } = Input


    const fetchInventory = async () => {
        const { data } = await callApi(
            {
                uriEndPoint: inventoryConfig.getAllWithSearch,
                params: { item: search, page, limit },

            },

        )
        if (!data.total) {
            message.info("No Data Found")
        }
        setInventory(data.list)
        setTotalCount(data.total)
    }
    useEffect(() => {
        fetchInventory()
    }, [])
    useEffect(() => {
        fetchInventory()
    }, [isOpen, search, page, limit])

    const columns = [
        {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (no) => <a>{no}</a>,
        },
        {
            title: "Make",
            dataIndex: "make",
            key: "make",
        },
        {
            title: "Model",
            dataIndex: "model",
            key: "model",
        },
        {
            title: "Year",
            dataIndex: "year",
            key: "year",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, { status }) => (
                <>
                    {status == "Live" && <Tag color="success" >
                        {status}
                    </Tag>}
                    {status == "Sold" && <Tag color="geekblue" >
                        {status}
                    </Tag>}
                </>
            ),
        },

        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {
                        setIsOpen(true)
                        setUpdateContent(record)
                        setModalType('EDIT')
                    }}>Edit/View</a>
                    <InventoryModal
                        modalType={modalType}
                        modalContent={updateContent}
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}

                    />
                </Space>
            ),
        },
    ];

    const handlePagination = (pagination, value) => {
        setPage(pagination.current)
        setLimit(pagination.pageSize)
    }


    return (
        <div>
            <div style={{
                display: "flex",
                gap: '1em',
                marginBottom: '1em'
            }}>
                <Search
                    placeholder="Search..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => { setSearch(value) }}
                />
                <Button type="primary" size="large" onClick={() => {
                    setIsOpen(true)
                    setModalType('ADD')
                }}>ADD Vehicle
                </Button>
                <InventoryModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    modalType={"ADD"}
                />
            </div>
            <Table columns={columns} dataSource={inventory} pagination={{
                showQuickJumper: true,
                pageSize: limit || 10,
                current: page || 1,
                total: totalCount,
            }} onChange={handlePagination} />;
        </div>
    );
}

export default Inventory;
