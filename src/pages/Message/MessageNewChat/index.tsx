import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from "react-router-dom";


import colors from 'src/constants/colors';
import TopBar from './TopBar';

import type { Theme } from 'src/theme';
import SearchData from 'src/components/Search/SearchData';
import {getContactList as _getContactList} from 'src/actions/contactAction';
import useAuth from 'src/hooks/useAuth';
import ContactItem from './ContactItem';





const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		// width: '100%',
		display: 'flex',
		flexDirection: 'column',
		borderLeft: '1px solid ' + colors.$containerBorderColor,
	},
	container1: {
		flex: 1,
		overflowY: 'auto',
		display: 'flex',
		flexDirection: 'column',
		// height: 'calc(100% - ' + BAR_HEIGHT_V + 'px - 10px)',
		// maxHeight: 'calc(100% - ' + BAR_HEIGHT_V + 'px - 10px)',
	},
	container2: {
		flex: 1,
		overflowY: 'auto',
		padding: '5px 0px 5px 5px',
		// height: 'calc(100% - ' + BAR_HEIGHT_V + 'px - 10px)',
		// maxHeight: 'calc(100% - ' + BAR_HEIGHT_V + 'px - 10px)',
	},
	content: {
		padding: 2,
		paddingRight: 10,
	},
}));

const MessageNewChatView: FC = () => {
    const classes = useStyles();
	const history = useHistory();
	const { key } = useAuth();
	
	const [searchString, setSearchString] = useState('');

	const [contactListTemp, setContactListTemp] = useState(null);
	const [contactList, setContactList] = useState([]);

	useEffect(() => {
		getContactList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
        searchString && getContactList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchString]);
	
	useEffect(() => {
        makeContactList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactListTemp]);

	const handleSearchStringChange = (value) => {
		setSearchString(value);
	}

	const getContactList = async () => {
        const _data = await _getContactList(key, {
            searchString: searchString || '',
            key: key.public,
        });
		console.log('contact data', _data);
		setContactListTemp(_data.data);
    }

	const makeContactList = () => {
		console.log('contactListTemp', contactListTemp)
        if(contactListTemp){
            const _temp = [];

            for(var i = 0; i < contactListTemp.uRows.length; i++) {
                if(i === 0) {
                    const _fContactList = {
                        id: _temp.length,
                        type: 'group',
                        title: 'Matched contacted',
                    };
                    _temp.length === 0 && _temp.push(_fContactList);
                }
                _temp.push(
                    // @ts-ignore
                    {
                        id: _temp.length,
                        type: 'user',
                        item: contactListTemp.uRows[i],
                    }
                );
            }

            for(i = 0; i < contactListTemp.fRows.length; i++) {
                if(i === 0) {
                    const _fContactList = {
                        id: _temp.length,
                        type: 'group',
                        title: 'Frequently contacted',
                    };
                    _temp.length === 0 && _temp.push(_fContactList);
                }
                _temp.push(
                    // @ts-ignore
                    {
                        id: _temp.length,
                        type: 'item',
                        item: contactListTemp.fRows[i],
                    }
                );
            }
    
            var groupId = '';
            for(i = 0; i < contactListTemp.rows.length; i++) {
                const _item = contactListTemp.rows[i];
				const _sC = _item.firstName ?  _item.firstName.charAt(0) : ' ';
    
                if(groupId === _sC.toUpperCase()) {
    
                }else{
                    groupId = _sC.toUpperCase();
                    _temp.push(
                        {
                            id: _temp.length,
                            type: 'group',
                            title: groupId,
                        }
                    );
                }
                _temp.push(
                    // @ts-ignore
                    {
                        id: _temp.length,
                        type: 'item',
                        item: _item,
                    }
                );
            }
			console.log('---sd-f-dsf--', _temp)
            setContactList(_temp);
        }else{
            setContactList([]);
        }
        
    }

    return (
		<div className={classes.root}>
			<TopBar />
			<div className={classes.container1}>
				<SearchData handleSearchStringChange={handleSearchStringChange} searchString={searchString} />
				<div className={classes.container2}>
					<PerfectScrollbar>
						<div className={classes.content}>
							{
								contactList.length > 0 &&
								contactList.map((contact, index) =>
									<ContactItem 
										key={index.toString()}
										contact={contact}
										onClick={() => {
											history.push({
												pathname: '/page/message/chat',
												state: {
													contact: contact.item,
													groupId: null,
												}
											})
										}}
									/>
								)
							}
						</div>
					</PerfectScrollbar>
				</div>
			</div>
		</div>
	);
};

export default MessageNewChatView;
