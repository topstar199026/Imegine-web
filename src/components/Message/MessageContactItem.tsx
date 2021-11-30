import { FC, useEffect, useState } from 'react';
import {
	ListItem} from '@material-ui/core';
import { Link } from 'react-router-dom';
import colors from 'src/constants/colors';
import { $flex, $font, $itemCenterH, $itemCenterV, $size, $style, $textCenter, $width } from 'src/utils/font-utilts';
import moment from 'moment';

import Avatar from 'src/components/Image/Avatar';
import images from 'src/constants/images';
import fonts from 'src/constants/fonts';
import useAuth from 'src/hooks/useAuth';
import { getGroupData, getContactInfo } from 'src/actions/contactAction';
interface Props {
	className?: any;
	pathname?: any;
	item?: any;
	onClick?: (contactInfo: any) => void;
}

const MessageContactItem: FC<Props> = (props) => {

	const item = props.item;
	console.log(item);

	const { newMessage, typingStatus, messageReadState, device, key, sendReadByRequest, sendMessage, sendTypingStatus } = useAuth();
	
	
	const [groupName, setGroupName] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);


	useEffect(() => {
		handleContactInfo();
		return () => {
		
		}
	}, [item])

	const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

	const handleContactInfo = async () => {
		let _private = item._private;
		try {
			if(_private === true) {
                const members = Object.values(item.member);
                let _contactId;
                for(var i=0; i<members.length; i++) {
                    if(members[i] !== device.deviceUserId) _contactId = members[i];
                }
                if(_contactId) {
                    const res = await getContactInfo(key, {
                        contactId: _contactId,
                    });

					console.log('contact data get data', res);
                    if(res.status === true) {
                        const _contactInfo = res.data;
                        const isContactInfo = _contactInfo.groupId ? true : false;
                        let _groupName;
                        if(isContactInfo) {
                        }
                        _groupName = _contactInfo.firstName ? 
                            capitalize(_contactInfo.firstName) + ' ' + capitalize(_contactInfo.lastName)
                            :
                            _contactInfo.nickName + '(' + (isContactInfo ? _contactInfo.contactId : _contactInfo.userId) +')';
                        setGroupName(_groupName);
                        setContactInfo(_contactInfo);
                    } else {
                        setGroupName('Load failed.')
                    }
                    
                }else {
                    setGroupName('No contact id.')
                };
            }else{
                setGroupName(item.groupName.toString());
            }
		} catch (error) {
			console.log('error', error);
		}
	}

	const getChatTime = (date) => {
        return moment(date).format('HH:mm');
    }

	return (
		<div			
			style={
				$style([{
						marginBottom: 5,
						borderRadius: 20,
						boxShadow: '0px 0px 10px 0px '+ colors.$barPrimaryBoxShadowColor,
					},
					$size('100%', 78),	
				])
			}>
			<ListItem 				
				// component={Link}
				// to={'/page/message/id'}
				onClick={() => props.onClick(contactInfo)}
				style={$style([
					{
						borderRadius: 20,
						padding: 0,
					},
					$size('100%', '100%'),					
					$flex(),
					$itemCenterH(),
				])} 
				button>
				<div
					style={
						$style([
							{
								paddingTop: 5,
								paddingLeft: 21,
							},
							$width(40),
							$itemCenterV(),
							$textCenter(),
						])
					}>
					<div>
						<Avatar 
							img={images.avatar.userAvatar2} 
							styleContainer={$style([
								{
									backgroundColor: colors.$transparent,
									borderRadius: '50%',
									border: '3px solid ' + colors.$buttonGreen,					
								},
								$size(34, 34),
							])}
							styleImage={$style([
								{
									borderRadius: '50%',
								},
								$size(34, 34),
							])}
						/>
					</div>
					<div>
						<span style={$style([
							$font(fonts.rubikBold, colors.$black, 11, 17, 0.6), 
						])}>{getChatTime(item.updatedAt)}</span>
					</div>
				</div>
				<div
					style={
						$style([
							{
								flex: 1,
								padding: '0px 10px',
							},
						])
					}>
					<div>
						<span 
							style={$style([
								$font(fonts.rubikBold, colors.$secondaryBlue, 14, 18), 
							])}>
							{
                                groupName ?
                                capitalize(groupName)
                                :
                                'Loading...'
                            }
						</span>
					</div>
					<div
						style={$style([
							{
								maxHeight: 34,
								overflow: 'hidden',
							}
						])}>
						<span 
							style={$style([
								{},
								$font(fonts.rubikRegular, colors.$secondaryBlue, 11, 12), 
							])}>
							{item.lastMessage}	
						</span>
					</div>
				</div>
				<div
					style={
						$style([
							{
								paddingRight: 14,
							},
							$width(20),
							$itemCenterV(),
							$textCenter(),
						])
					}>
					<div
						style={
							$style([
								{
									borderRadius: '50%',
									backgroundColor: colors.$buttonGreen,
								},
								$size(20, 20),
								$itemCenterV(),
								$textCenter(),
							])
						}>
						<span style={$style([
							$font(fonts.rubikBold, colors.$white, 11, 17), 
						])}>{'20'}</span>
					</div>
				</div>	
			</ListItem>	
		</div>
	);
}

export default MessageContactItem;
