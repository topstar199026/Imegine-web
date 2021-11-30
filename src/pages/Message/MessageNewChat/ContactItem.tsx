import { ListItem } from '@material-ui/core';

import colors from 'src/constants/colors';
import fonts from 'src/constants/fonts';

import { $flex, $font, $itemCenterH, $size, $style } from 'src/utils/font-utilts';

const ContactItem = (props) => {

    const contact = props.contact;
    console.log(contact)

    const imagePath = (item) => {
        return {
            uri: 
                item.item.contactImage ?
                'https://imegine-app.fra1.digitaloceanspaces.com/' + item.item.contactImage
                :
                'https://imegine-app.fra1.digitaloceanspaces.com/avatar/no-user-image'
        };
    };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            {
                contact.type === 'group' ?
                <div			
                    style={
                        $style([{
                                marginBottom: 5,
                                boxShadow: '0px 2px 5px 0px '+ colors.$barPrimaryBoxShadowColor,
                            },
                            $size('100%', 35),	
                        ])
                    }>
                    <ListItem 
                        // component={Link}
                        // to={'/page/message/id'}
                        style={$style([
                            {
                                padding: 0,
                                paddingLeft: 15,
                            },
                            $size('100%', '100%'),					
                            $flex(),
                            $itemCenterH(),
                        ])} 
                        >
                        <div>
                            <span style={$style([
                                $font(fonts.rubikMedium, colors.$secondaryBlue, 17, 17), 
                            ])}>{contact.title}</span>
                        </div>
                    </ListItem>
                </div>
                :
                contact.type === 'user' ? 
                <div				
                    style={
                        $style([{
                                marginBottom: 5,
                                // marginLeft: 15,
                                borderBottom: 'solid 1px ' + colors.$bottomBorderShadowColor,
                            },
                            $size('100%', 30),	
                        ])
                    }>
                    <ListItem 
                        // component={Link}
                        // to={'/page/message/id'}
                        style={$style([
                            {
                                padding: 0,
                                paddingLeft: 15,
                            },
                            $size('100%', '100%'),					
                            $flex(),
                            $itemCenterH(),
                        ])} 
                        onClick={() => props.onClick()}
                        button>
                        <div>
                            <span 
                                style={$style([
                                    $font(fonts.rubikMedium, colors.$secondaryBlue, 17, 17), 
                                ])}>
                                {/* {
                                    capitalize(contact.item.firstName) + ' ' + capitalize(contact.item.lastName)
                                } */}
                                {capitalize(contact.item.nickName) + ' (' + capitalize(contact.item.userId) + ')'}
                            </span>
                        </div>
                    </ListItem>
                </div>
                :
                <div				
                    style={
                        $style([{
                                marginBottom: 5,
                                // marginLeft: 15,
                                borderBottom: 'solid 1px ' + colors.$bottomBorderShadowColor,
                            },
                            $size('100%', 30),	
                        ])
                    }>
                    <ListItem 
                        // component={Link}
                        // to={'/page/message/id'}
                        style={$style([
                            {
                                padding: 0,
                                paddingLeft: 15,
                            },
                            $size('100%', '100%'),					
                            $flex(),
                            $itemCenterH(),
                        ])} 
                        onClick={() => props.onClick()}
                        button>
                        <div>
                            <span 
                                style={$style([
                                    $font(fonts.rubikMedium, colors.$secondaryBlue, 17, 17), 
                                ])}>
                                {/* {
                                    capitalize(contact.item.firstName) + ' ' + capitalize(contact.item.lastName)
                                } */}
                                {
                                    contact.item.firstName && contact.item.lastName ?
                                    capitalize(contact.item.firstName) + ' ' + capitalize(contact.item.lastName)
                                    :
                                    contact.item.nickName ? 
                                    capitalize(contact.item.nickName)
                                    :
                                    contact.item.contactId ?
                                    contact.item.nickName 
                                    :
                                    contact.item.contactName
                                }
                            </span>
                        </div>
                    </ListItem>
                </div>
            }
        </>
            
    );
};

export default ContactItem;
